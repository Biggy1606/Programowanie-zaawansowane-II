using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace lab.Tests
{
    public class ProgramTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public ProgramTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetRoot_ReturnsHtmlContent()
        {
            // Arrange

            // Act
            var response = await _client.GetAsync("/");

            // Assert
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            Assert.Contains("<h1>Application Settings</h1>", content);
        }

        [Fact]
        public async Task GetCurrencies_ReturnsSuccessMessage()
        {
            // Arrange

            // Act
            var response = await _client.GetAsync("/api/currencies");

            // Assert
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            Assert.Contains("Data downloaded and inserted into the database successfully.", content);
        }

        [Fact]
        public async Task GetCurrencies_HandlesExceptions()
        {
            // Arrange
            // TODO: Mock or set up a scenario that throws an exception

            // Act
            var response = await _client.GetAsync("/api/currencies");

            // Assert
            Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
            var content = await response.Content.ReadAsStringAsync();
            Assert.StartsWith("An error occurred:", content);
        }
    }
}
