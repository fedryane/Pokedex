import { Layout } from "../components";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home({ styles, pokeData }) {
  // console.log(pokeData)
  const [searchPoke, setSearchPoke] = useState(pokeData);
  const [pokeArr, setPokeArr] = useState(searchPoke.slice(0, 20));
  const [page, setPage] = useState(0);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setPokeArr(searchPoke.slice(page * 12, (page + 1) * 12));
  }, [page]);

  useEffect(() => {
    setPokeArr(searchPoke.slice(0, 12));
  }, [searchPoke]);

  useEffect(() => {
    if (input.length === 0 && filter === "All") {
      setSearchPoke(pokeData);
      return;
    }
    if (input.length !== 0 && filter === "All") {
      setSearchPoke(
        (c) =>
          (c = pokeData.filter((pokeman) => {
            return pokeman.name.english.toLowerCase().includes(input.toLowerCase());
          }))
      );
      return;
    }
    if (input.length === 0 && filter !== "All") {
      setSearchPoke(
        (c) =>
          (c = pokeData.filter((pokeman) => {
            return pokeman.type.includes(filter);
          }))
      );
      return;
    }
    if (input.length !== 0 && filter !== "All") {
      setSearchPoke(
        (c) =>
          (c = pokeData.filter((pokeman) => {
            return pokeman.type.includes(filter) && pokeman.name.english.toLowerCase().includes(input.toLowerCase());
          }))
      );
      return;
    }
  }, [input, filter]);
  // ======================= Pagination handle ======================= //
  const handlePrev = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  // ======================= Filter handle ======================= //
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // ======================= Search handle ======================= //
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  console.log(input, filter);

  return (
    <Layout title={"Fedpokedex"}>
      <div className="flex justify-between px-[100px] my-10">
        <div className="form-control">
          <div className="input-group">
            <button className="btn">Go</button>
            <select className="select select-bordered" onChange={handleFilterChange} value={filter}>
              <option value="All">All</option>
              <option value="Normal">Normal</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Electric">Electric</option>
              <option value="Grass">Grass</option>
              <option value="Ice">Ice</option>
              <option value="Fighting">Fighting</option>
              <option value="Poison">Poison</option>
              <option value="Ground">Ground</option>
              <option value="Flying">Flying</option>
              <option value="Psychic">Psychic</option>
              <option value="Bug">Bug</option>
              <option value="Rock">Rock</option>
              <option value="Ghost">Ghost</option>
              <option value="Dragon">Dragon</option>
              <option value="Dark">Dark</option>
              <option value="Steel">Steel</option>
              <option value="Fairy">Fairy</option>
            </select>
          </div>
        </div>
        <div className="form-control">
          <div className="input-group">
            <input type="text" placeholder="Search…" className="input input-bordered" onChange={handleInputChange} value={input} />
            <button className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {pokeArr.map((pokeman, index) => {
          return (
            <div key={pokeman.name.english}>
              <Link href={`/pokemons/${pokeman.id}`}>
                <a>
                  <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="absolute bg-gray-700 px-4 py-2 rounded-full top-[10px] right-[15px] ">
                      <p className="font-extrabold text-lg text-gray-500 text-center">{pokeman.id}</p>
                    </div>
                    <figure>
                      <img src={pokeman.image.hires} alt="pokemon" className="w-[300px] h-[300px] mt-5" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {pokeman.name.english}
                        <div className="badge badge-secondary">Kanto</div>
                      </h2>
                      <p>{pokeman.description.slice(0, 109) + " " + "..."}</p>
                      <div className="card-actions justify-end">
                        {pokeman.type.map((type, j) => {
                          return (
                            <span key={type} className="badge shadow-xl px-4 py-4 text-white font-bold cursor-pointer" style={{ backgroundColor: styles[type] }}>
                              {type}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <div className="flex flex-wrap justify-center gap-5 px-[400px] my-12">
          <button className="btn rounded-lg hover:bg-white hover:text-black" onClick={handlePrev} disabled={page === 0 ? true : false}>
            Previous page
          </button>
          <button className="btn rounded-lg hover:bg-white hover:text-black" onClick={handleNext} disabled={searchPoke.length / 20 - page < 1 ? true : false}>
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://api.pikaserve.xyz/pokemon/all");
    const data = await res.json();
    return {
      props: {
        pokeData: data,
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
