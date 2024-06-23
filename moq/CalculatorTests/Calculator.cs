namespace CalculatorTests;

public class Calculator {
    private readonly IWebService _webService;

    public Calculator(IWebService webService) {
        _webService = webService;
    }

    public int Add(int a, int b) {
        var result = a + b;
        _webService.SendData($"Add operation: {a} + {b} = {result}");
        return result;
    }
}