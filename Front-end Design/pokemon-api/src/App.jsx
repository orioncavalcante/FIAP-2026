import { useState, useEffect } from "react";

export default function App() {
	const [id, setId] = useState(1);
	const [pokemon, setPokemon] = useState(null);
	const [carregando, setCarregando] = useState(true);

	const coresTipos = {
		normal: "bg-gray-200 text-gray-700",
		fire: "bg-orange-100 text-orange-700",
		water: "bg-blue-100 text-blue-700",
		electric: "bg-yellow-100 text-yellow-700",
		grass: "bg-green-100 text-green-700",
		ice: "bg-cyan-100 text-cyan-700",
		fighting: "bg-red-100 text-red-700",
		poison: "bg-purple-100 text-purple-700",
		ground: "bg-amber-200 text-amber-800",
		flying: "bg-indigo-100 text-indigo-700",
		psychic: "bg-pink-100 text-pink-700",
		bug: "bg-lime-100 text-lime-700",
		rock: "bg-stone-200 text-stone-700",
		ghost: "bg-violet-100 text-violet-700",
		dragon: "bg-indigo-200 text-indigo-800",
		dark: "bg-gray-800 text-white",
		steel: "bg-slate-200 text-slate-700",
		fairy: "bg-pink-200 text-pink-800",
	};

	useEffect(() => {
		async function buscarPokemon() {
			setCarregando(true);
			try {
				const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
				const dados = await resposta.json();
				setPokemon(dados);
			} catch(erro) {
				console.error('Erro ao buscar pokemon: ', erro);
				setPokemon(null);
			} finally {
				setCarregando(false);
			}
		}
		buscarPokemon();
	}, [id])

	return (
		<div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
			<div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
				<h1 className="text-3xl font-bold text-slate-800 mb-6">Pokedéx</h1>

				{carregando ? (<p>Carregando...</p>) :
				pokemon ? (
					<>
						<div className="bg-slate-100 rounded-xl p-4 mb-4">
							<img 
							src={pokemon.sprites.other['official-artwork'].front_default} 
							alt={pokemon.name}
							className="w-40 h-40 mx-auto" />
						</div>

						<p className="text-gray-400">#{pokemon.id}</p>
						<h2 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h2>
						<div className="flex justify-center gap-2 mb-6">
							{pokemon.types.map((tipo) => (
								<span
								key={tipo.type.name}
									className={`${coresTipos[tipo.type.name] || "bg-gray-200 text-gray-700"} px-3 py-1 rounded-full text-sm capitalize`}>
									{tipo.type.name}
								</span>
							))}
						</div>
					</>
				) : (<p className="mb-6">Não foi possível carregar.</p>)}

				<div className="flex gap-3">
					<button
					onClick={() => setId(id - 1)}
					disabled={id === 1}
					className="flex-1 bg-gray-200 hover:bg-gray-300 
					disabled:opacity-40 px-4 py-2 rounded-lg font-medium 
					cursor-pointer disabled:cursor-not-allowed">
						Anterior
					</button>

					<button
					onClick={() => setId(id + 1)}
					className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2
					rounded-lg font-medium cursor-pointer">
						Próximo
					</button>
				</div>
			</div>
		</div>
	)
}