import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IConfidenceLocationService} from "./core";
import {fetchLocations} from "./actions/location.actions";

function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [state, setState] = React.useState<IConfidenceLocationService>();

  React.useEffect(() => {
    (async () => {
      const res: { response?: IConfidenceLocationService, error?: any } = await fetchLocations<IConfidenceLocationService>();
      console.log("res: ", res);

      setState(res.response);
      setIsLoading(false);
    })()
  }, []);

  return (
    <div className="App">
      {
        isLoading && <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }

      <section className="card">
        {
          state?.locations.map(location => {
            return <div key={location.id} className="card m-2">
              {
                location.locationDetails && <div className="card-text text-black">
                  <span>Location details: </span>
                  <span>{location.locationDetails}</span>
                </div>
              }
              {
                location.address && <div className="card-text text-black d-flex flex-column">
                  {
                    location.address.city && <div>
                      <span>City: </span>
                      <span>{location.address.city}</span>
                    </div>
                  }

                  {
                    location.address.addressLine1 && <div>
                      <span>Address Line 1: </span>
                      <span>{location.address.addressLine1}</span>
                    </div>
                  }

                  {
                    location.address.addressLine2 &&
                    <div>
                      <span>Address Line 2: </span>
                      <span>{location.address.addressLine2}</span>
                    </div>
                  }

                  {
                    location.address.state &&
                    <div>
                      <span>State: </span>
                      <span>{location.address.state}</span>
                    </div>
                  }

                  {
                    location.address.zip &&
                    <div>
                      <span>Zip: </span>
                      <span>{location.address.zip}</span>
                    </div>
                  }
                </div>
              }

              {
                location.locationType && <div className="card-text text-black">
                  <span>Location type: </span>
                  <span>{location.locationType}</span>
                </div>
              }

            </div>
          })
        }
      </section>
    </div>
  );
}

export default App;
