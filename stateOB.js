const app = document.getElementById("root");

const logo = document.createElement("img");
logo.src = "logo.gif";

const container = document.createElement("div");
container.setAttribute("class", "container");

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open("GET", "https://api.covidindiatracker.com/state_data.json", true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    let state = window.location.href.split("?")[1];

    if (state.includes("%20")) {
      state = state.replace("%20"," ");
    }
    data
      .filter((s) => s.state == state)[0]
      .districtData.forEach((stateOB) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = stateOB.name;

        const p = document.createElement("p");
        p.textContent = `Confirmed :${stateOB.confirmed}\n Recovered : ${stateOB.recovered}
      Deaths :${stateOB.deaths}`;
      
      let val=stateOB.zone;
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (val == "RED")
        {
          const h2 = document.createElement("h2");
          h2.textContent = stateOB.zone+" ZONE";
          card.appendChild(h2);
        }
        else if(val=="ORANGE")
        {
          const h4 = document.createElement("h4");
          h4.textContent = stateOB.zone+" ZONE";
          card.appendChild(h4);
        }
        else
        {
          const h3 = document.createElement("h3");
          h3.textContent = stateOB.zone+" ZONE";
          card.appendChild(h3);
        }
      });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};
request.send();
