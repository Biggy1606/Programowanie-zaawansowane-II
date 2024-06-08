import "./App.css";

function App() {
  return (
    <>
      <h1>Konwerter waluty</h1>
      <div>
        <ul className="menu">
          <li>
            <a className="menu-button" href="/">
              Strona główna
            </a>
          </li>
          <li>
            <a className="menu-button" href="/tabela">
              Tabela walut
            </a>
          </li>
        </ul>
      </div>
      <div className="card">
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="amount">Kwota</label>
            <input type="number" id="amount" name="amount" />
            <select id="currency" name="currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
            </select>
            ➡️
            <select id="currency" name="currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
            </select>
          </div>
          <button type="submit">Przelicz</button>
        </div>
      </div>
      <div className="result">
        <div className="history-header">
          <h3>Historia wyników</h3>
          <button>🔄</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Kwota</th>
              <th>Waluta (z)</th>
              <th>Wynik</th>
              <th>Waluta (na)</th>
              <th>Data wpisu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>USD</td>
              <td>380</td>
              <td>PLN</td>
              <td>2023-04-20</td>
            </tr>
            <tr>
              <td>50</td>
              <td>EUR</td>
              <td>220</td>
              <td>PLN</td>
              <td>2023-04-19</td>
            </tr>
            <tr>
              <td>1000</td>
              <td>GBP</td>
              <td>5200</td>
              <td>PLN</td>
              <td>2023-04-18</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="footer">
        Dane używane do przeliczeń są z <a href="http://api.nbp.pl/">API NPB</a>
      </p>
    </>
  );
}

export default App;
