using Xunit;

namespace Calculator.Tests
{
    public class CalculatorTests
    {
        [Fact]
        public void Add_TwoNumbers_ReturnsSum()
        {
            // Arrange
            int a = 5;
            int b = 3;
            int expectedSum = 8;

            // Act
            int actualSum = Calculator.Add(a, b);

            // Assert
            Assert.Equal(expectedSum, actualSum);
        }
    }
}