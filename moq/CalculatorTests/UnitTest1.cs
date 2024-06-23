using Moq;

namespace CalculatorTests;

public class CalculatorTests {
    [Fact]
    public void Add_ShouldSendDataToWebService() {
        // Arrange      
        var webServiceMock = new Mock<IWebService>();
        var calculator = new Calculator(webServiceMock.Object);

        // Act
        var result = calculator.Add(3, 5);

        // Assert
        Assert.Equal(8, result);
        webServiceMock.Verify(ws => ws.SendData("Add operation: 3 + 5 = 8"), Times.Once);
    }
}

public class OrderProcessorTests {
    [Fact]
    public void ProcessOrder_ShouldCallPlaceOrderWithCorrectParameters() {
        // Arrange
        var orderServiceMock = new Mock<IOrderService>();
        var orderProcessor = new OrderProcessor(orderServiceMock.Object);

        // Act
        orderProcessor.ProcessOrder("ProductABC", 3);

        // Assert
        orderServiceMock.Verify(os => os.PlaceOrder("ProductABC", 3), Times.Once);
    }

    [Fact]
    public void ProcessOrder_ShouldCallPlaceOrderMultipleTimes() {
        // Arrange
        var orderServiceMock = new Mock<IOrderService>();
        var orderProcessor = new OrderProcessor(orderServiceMock.Object);

        // Act
        orderProcessor.ProcessOrder("Product1", 2);
        orderProcessor.ProcessOrder("Product2", 5);

        // Assert
        orderServiceMock.Verify(os => os.PlaceOrder("Product1", 2), Times.Once);
        orderServiceMock.Verify(os => os.PlaceOrder("Product2", 5), Times.Once);
    }
}