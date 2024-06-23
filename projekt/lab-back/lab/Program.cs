using lab;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;
        var url = configuration["AppSettings:DataUrl"];
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        var app = builder.Build();
        var htmlBody = $$"""
                         <html>
                         <head>
                             <style>
                                 body {
                                     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                                     background-color: #1c1c1e;
                                     color: #f5f5f7;
                                     padding: 20px;
                                 }
                                 h1 {
                                     color: #ff2d55;
                                     font-size: 32px;
                                     margin-bottom: 20px;
                                 }
                                 p {
                                     margin-bottom: 10px;
                                     font-size: 18px;
                                 }
                                 strong {
                                     color: #34c759;
                                 }
                             </style>
                         </head>
                         <body>
                             <h1>Application Settings</h1>
                             <p><strong>NBP URL:</strong> <a href={url ?? "undefined"}>{url ?? "undefined"}</a></p>
                             <p><strong>Connection String:</strong> {connectionString ?? "undefined"}</p>
                         </body>
                         </html>
                         """;

        app.MapGet("/", async context => { await context.Response.WriteAsync(htmlBody); });

        app.MapGet("/api/currencies", async context =>
        {
            using var client = new HttpClient();
            try
            {
                // get NPB data
                var request = new HttpRequestMessage();
                request.RequestUri = new Uri("https://api.nbp.pl/api/exchangerates/tables/A?format=json");
                request.Method = HttpMethod.Get;
                request.Headers.Add("Accept", "*/*");

                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();
                var resultTyped = JsonConvert.DeserializeObject<IList<CurrencyMain>>(result);

                if (resultTyped == null)
                {
                    await context.Response.WriteAsync("No (or bad) data from NBP API.");
                    return;
                }

                // database
                await using var connection = new NpgsqlConnection(connectionString);
                await connection.OpenAsync();

                foreach (var rate in resultTyped[0].Rates)
                {
                    // check if currency exists in database
                    var checkCommand =
                        new NpgsqlCommand("SELECT value FROM nbp_currencies WHERE code = @code", connection);
                    checkCommand.Parameters.AddWithValue("@code", rate.Code);
                    var existingCode = await checkCommand.ExecuteScalarAsync();

                    // if not, insert it
                    if (existingCode == null)
                    {
                        var insertCommand =
                            new NpgsqlCommand(
                                "INSERT INTO nbp_currencies (code, name, value) VALUES (@code, @name, @value)",
                                connection);
                        insertCommand.Parameters.AddWithValue("@code", rate.Code);
                        insertCommand.Parameters.AddWithValue("@name", rate.Currency);
                        insertCommand.Parameters.AddWithValue("@value", rate.Mid);
                        await insertCommand.ExecuteNonQueryAsync();
                    }
                    // if yes, check if mid value is different
                    else
                    {
                        var existingMidValue = (decimal)existingCode;
                        if (existingMidValue != (decimal)rate.Mid)
                        {
                            var updateCommand =
                                new NpgsqlCommand("UPDATE nbp_currencies SET value = @value WHERE code = @code",
                                    connection);
                            updateCommand.Parameters.AddWithValue("@value", rate.Mid);
                            updateCommand.Parameters.AddWithValue("@code", rate.Code);
                            await updateCommand.ExecuteNonQueryAsync();
                        }
                    }
                }

                await context.Response.WriteAsync("Data downloaded and inserted into the database successfully.");
            }
            catch (Exception ex)
            {
                await context.Response.WriteAsync($"An error occurred: {ex.Message}");
            }
        });

        app.Run();
    }
}
