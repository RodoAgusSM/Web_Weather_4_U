let AirPollution = class {
	constructor(airPollution) {
		this.AQI = airPollution.list[0].main.aqi;
		this.carbonMonoxide = airPollution.list[0].components.co;
		this.nitrogenMonoxide = airPollution.list[0].components.nh3;
		this.nitrogenDioxide = airPollution.list[0].components.no;
		this.ozone = airPollution.list[0].components.no2;
		this.sulphurDioxide = airPollution.list[0].components.o3;
		this.fineParticlesMatter = airPollution.list[0].components.pm2_5;
		this.coarseParticulateMatter = airPollution.list[0].components.pm10;
		this.ammonia = airPollution.list[0].components.so2;
	}
};

export default AirPollution;
