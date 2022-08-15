import React from "react";
import { Layout } from "../../components";

const Details = ({ pokeman, styles }) => {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name.english}>
      <div className="flex xl:flex-row flex-col lg:justify-evenly justify-center py-20">
        <div className="kiri">
          <div className="flex-col">
            <div className="flex flex-row gap-2">
              <span className=" bg-gray-700 font-extrabold px-4 py-2 rounded-full shadow-xl">{pokeman.id}</span>
              <p className="font-bold text-4xl ">{pokeman.name.english}</p>
            </div>
            <p className="lg:absolute relative  lg:text-[128px] text-5xl  font-extrabold text-gray-600">{pokeman.name.japanese}</p>
          </div>
          <img src={pokeman.image.hires} alt="pokemon" className="relative xl:w-[500px] xl:h-[500px] w-[240px] h-[240px]" />
          <span className="absolute rotate-[-90deg] top-[400px] left-[-20px] text-3xl font-bold text-gray-600">
            <p className="xl:visible invisible ">{pokeman.species}</p>
          </span>
          <div className="flex xl:visible invisible font-lg text-lg gap-4 font-semibold cursor-pointer justify-center mt-7 ">
            <span className="py-6 px-4 font-bold rounded-full badge hover:bg-slate-200 hover:text-black shadow-lg">Weight : {pokeman.profile.weight}</span>
            <span className="py-6 px-4 font-bold rounded-full badge hover:bg-slate-200 hover:text-black shadow-lg">Height: {pokeman.profile.height}</span>
          </div>
        </div>

        <div className="kanan">
          {pokeman.type.map((type, index) => {
            return (
              <div key={type} className="badge shadow-xl px-4 py-4 text-white font-bold cursor-pointer mx-1" style={{ backgroundColor: styles[type] }}>
                {type}
              </div>
            );
          })}
          <div className="flex-col">
            <p className="font-bold text-5xl my-3">{pokeman.name.english}</p>
            <span className="flex flex-row gap-3 text-lg">
              <p>• ᴊᴘɴ | {pokeman.name.japanese} </p>
              <p>• ꜰʀᴀ | {pokeman.name.french} </p>
              <p>• ᴄʜɴ | {pokeman.name.chinese} </p>
            </span>
            <p className="badge my-5 py-3 shadow-xl">
              Ability : {`${pokeman.profile.ability[0] ? "" : "1"} ${pokeman.profile.ability[0][0]}`}
              <img src={pokeman.image.sprite} alt="icon" className=" w-[70px] h-[70px]" />
            </p>
            <p className="absolute text-left">{pokeman.description}</p>
            <div className="mt-24">
              <p className="font-bold text-3xl my-5">Base Stats</p>
              <div className="cursor-pointer">
                {Object.keys(pokeman.base).map((stat, index) => {
                  let statPercentFactor = 0;
                  let statColor;
                  switch (stat) {
                    case "HP":
                      statPercentFactor = 2.55;
                      statColor = "#da4343";
                      break;
                    case "Attack":
                      statPercentFactor = 1.81;
                      statColor = "#f38d45";
                      break;
                    case "Defense":
                      statPercentFactor = 2.3;
                      statColor = "#f3d14a";
                      break;
                    case "Sp. Attack":
                      statPercentFactor = 1.73;
                      statColor = "#547fe4";
                      break;
                    case "Sp. Defense":
                      statPercentFactor = 2.3;
                      statColor = "#84df57";
                      break;
                    case "Speed":
                      statPercentFactor = 2.0;
                      statColor = "#f75887";
                      break;
                  }
                  return (
                    <div key={stat}>
                      <div className="flex justify-between font-semibold ">
                        <span className="badge my-2">{stat}</span>
                        <span className="badge my-2">{pokeman.base[stat]}</span>
                      </div>
                      <div className="h-6 w-full my-[7px] bg-gray-900 rounded-full shadow-xl">
                        <div className="py-3 rounded-full" style={{ backgroundColor: statColor, width: parseInt(pokeman.base[stat]) * statPercentFactor }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const response = await fetch(`https://api.pikaserve.xyz/pokemon/${query.id}`);
    const data = await response.json();
    return {
      props: {
        pokeman: data,
        styles: {
          Normal: "#A8A77A",
          Fire: "#EE8130",
          Water: "#6390F0",
          Electric: "#F7D02C",
          Grass: "#7AC74C",
          Ice: "#96D9D6",
          Fighting: "#C22E28",
          Poison: "#A33EA1",
          Ground: "#E2BF65",
          Flying: "#A98FF3",
          Psychic: "#F95587",
          Bug: "#A6B91A",
          Rock: "#B6A136",
          Ghost: "#735797",
          Dragon: "#6F35FC",
          Dark: "#705746",
          Steel: "#B7B7CE",
          Fairy: "#D685AD",
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default Details;
