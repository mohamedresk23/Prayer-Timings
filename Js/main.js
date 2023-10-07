{/* <option value="">Egypt</option>
        <option value="">Riyad</option>
        <option value="">Dubai</option>
        <option value="">Mecca</option>
        <option value="">Kuwait</option>
        <option value="">Qatar</option> */}


let cities = [ "Cairo", "Giza", "Alexandria", "Damietta", "Dakahlia" ];

const citiesSelect = document.getElementById("cities-select");

let params = {
  country: "EG",
  city: "Cairo"
};



for (let city of cities) {
  const content = `<option value="${ city }">${ city }</option>`;
  citiesSelect.innerHTML += content;
}

citiesSelect.addEventListener("change", () => {
  console.log(citiesSelect.value);
  let city = citiesSelect.value;
  params = {
    country: "EG",
    city: city
  };

  getPrayerTime(params);
});


// ?country=EG&city=C



const getPrayerTime = async (params) => {
  await axios.get('http://api.aladhan.com/v1/timingsByCity', { params: params })
    .then((respnce) => {
      const timings = respnce.data.data.timings;

      // document.getElementById("fajr-time").innerHTML = timings.Fajr;
      fillTimeForPrayer("fajr-time", timings.Fajr);
      fillTimeForPrayer("sunrise-time", timings.Sunrise);
      fillTimeForPrayer("dhuhr-time", timings.Dhuhr);
      fillTimeForPrayer("asr-time", timings.Asr);
      fillTimeForPrayer("maghrib-time", timings.Maghrib);
      fillTimeForPrayer("isha-time", timings.Isha);

      document.getElementById("date").innerHTML = `${ respnce.data.data.date.gregorian.weekday.en } : ${ respnce.data.data.date.readable }`;
      // console.log(timings);
      // console.log(respnce.data.data.date.gregorian.weekday);
    }).catch(
      (error) => {
        console.log(error);
      });
};


const fillTimeForPrayer = (id, time) => {
  timeFromate = new Date('1970-01-01T' + time + 'Z').toLocaleString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true });
  document.getElementById(id).innerHTML = timeFromate;

  // console.log(new Date('1970-01-01T' + time + 'Z').toLocaleString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true }));
};



getPrayerTime(params);