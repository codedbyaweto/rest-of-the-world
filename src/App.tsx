import { useState, useEffect } from "react";

type Country = {
  name: { common: string };
  cca3: string;
  flags?: { png?: string; svg?: string };
};

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,cca3,flags"
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data: Country[] = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("There was an error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const filteredCountries =
      search.trim() === ""
          ? []
          : countries.filter((country) =>
              country.name.common.toLowerCase().includes(search.toLowerCase())
          );

  return (
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "100vh",
            padding: "2rem",
            fontFamily: "sans-serif",
            backgroundColor: "grey",

          }}
      >
        <h1 style={{ marginBottom: "2rem" }}>Search by Country</h1>
        <input
            type="text"
            placeholder="Type a country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "2rem",
              width: "250px",
              textAlign: "center",
            }}
        />

        <ul style={{ listStyle: "none", padding: 0, width: "300px" }}>
          {filteredCountries.map((country) => (
              <li
                  key={country.cca3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "0.5rem",
                    backgroundColor: "beige",
                    padding: "0.5rem",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
              >
                {country.flags?.png && (
                    <img
                        src={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        style={{ width: "30px", height: "20px", objectFit: "cover" }}
                    />
                )}
                <span>{country.name.common}</span>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default App;