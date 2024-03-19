import { lookup } from 'geoip-lite';
import { DateTime } from 'luxon';
import { getCountry } from '@ladjs/country-language';

export const IpInformation = async (ip: string) => {
  const geo = lookup(ip);
  if (geo) {
    const timeZone = DateTime.local().setZone(geo.timezone).zoneName;
    // const language = countryLanguages.find(
    //   (item) => item.country === geo.country,
    // )?.language;
    const countryLanguage = await new Promise((resolve) => {
      // console.log(geo.country);
      getCountry(geo.country, (err, data) => {
        // console.log(data);
        if (data && data.languages && data.languages[0]) {
          const language = data.languages[0];
          resolve(language.langCultureMs ? language.langCultureMs[0] : null);
          // resolve(language.)
        }
        resolve(null);
      });
    });
    return {
      status: true,
      country: geo.country,
      city: geo.city,
      language: countryLanguage,
      timeZone: timeZone,
      // geo: geo,
    };
  } else {
    return {
      status: false,
    };
  }
};
