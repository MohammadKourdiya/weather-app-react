import "./App.css";

//REACT
import { useEffect, useState } from "react";

/*MATERIAL UI COMPONENTS*/
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material";

//EXTERNAL LIBRARIES

import axios from "axios";
import moment from "moment";
import "moment/min/locales";

import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

let cancelAxios = null;

function App() {
  const [t, i18n] = useTranslation();

  moment.locale("ar");
  const [temp, setTemp] = useState({
    number: null,
    minTemp: null,
    maxTemp: null,
    desc: null,
    tempIcon: null,
  });
  useEffect(() => {
    setDateAndTime(moment().format("MMMM/ Do/ YYYY"));
    i18n.changeLanguage(locale);
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=37.06&lon=37.38&appid=a46a751d0faca509ac7ac7cb6e735dc7",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const desc = response.data.weather[0].description;
        const tempIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          minTemp: min,
          maxTemp: max,
          desc,
          tempIcon: `https://openweathermap.org/img/wn/${tempIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);

  const [locale, setLocale] = useState("ar");
  const [datAndTime, setDateAndTime] = useState("");
  const direction = locale == "en" ? "ltr" : "rtl";
  function handleLanClick() {
    if (locale == "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().format("MMMM/ Do/ YYYY"));
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/*CONTENT CONTAINER*/}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/*CARD*/}
            <div
              dir={direction}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
                marginTop: "200px",
              }}
            >
              {/*CONTENT*/}
              <div>
                {/*CITY AND TIME*/}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "70px" }}
                  dir={direction}
                >
                  <Typography
                    style={{ marginRight: "10px", fontWeight: "600" }}
                    variant="h4"
                    gutterBottom
                  >
                    {t("غازي عنتاب")}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "16px" }}
                    gutterBottom
                  >
                    {datAndTime}
                  </Typography>
                </div>
                {/*===CITY AND TIME===*/}

                <hr />

                {/*CONTAINER OF DEGREE & CLOUD ICON*/}

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/*DEGREE & DESCRIPTION*/}
                  <div>
                    {/*TEMP*/}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      {/*TODO:TEMP IMAGE*/}
                      <img src={temp.tempIcon} />
                    </div>
                    {/*===TEMP===*/}

                    <Typography variant="h6" style={{ textAlign: "start" }}>
                      {t(temp.desc)}
                    </Typography>
                    {/*MAX & MIN*/}

                    <div
                      dir={direction}
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "start",
                      }}
                    >
                      <h5>
                        {locale == "ar"
                          ? temp.minTemp + t(": الصغرى")
                          : t(": الصغرى") + temp.minTemp}
                      </h5>
                      <h5>|</h5>
                      <h5>
                        {locale == "ar"
                          ? temp.minTemp + t(": الصغرى")
                          : t(": الصغرى") + temp.minTemp}
                      </h5>
                    </div>

                    {/*===MAX & MIN===*/}
                  </div>

                  {/*===DEGREE & DESCRIPTION===*/}
                  <CloudIcon style={{ fontSize: "100px" }} />
                </div>
                {/*==CONTAINER OF DEGREE & CLOUD ICON==*/}
              </div>
              {/*===CONTENT===*/}
            </div>
            {/*===CARD===*/}
          </div>
          {/*TRANSLATION CONTAINER*/}
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              style={{ color: "white" }}
              variant="text"
              onClick={handleLanClick}
            >
              {locale == "en" ? "Arabic" : "انكليزي"}
            </Button>
          </div>
          {/*===TRANSLATION CONTAINER===*/}
          {/*===CONTENT CONTAINER===*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
