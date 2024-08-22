export default function card( {pokmon}){

    return(
        <>
        <div className="pkcard">
            <img src={pokmon.sprites.other.dream_world.front_default}></img>
            <p className="head">{pokmon.name}</p>
            <p className="nato"> {pokmon.types.map((curType) => curType.type.name).join(", ")}</p>
            <div className="grid"><p>hieght:{pokmon.height}</p>
            <p>wieght:{pokmon.weight}</p>
            <p>Speed:{pokmon.stats[5].base_stat}</p></div>
            <div className="grids"><p>Experience:{pokmon.base_experience}</p>
            <p>Attack:{pokmon.stats[1].base_stat}</p>
            <p>Ability:{pokmon.abilities.map((abilityInfo) => abilityInfo.ability.name).splice(0,1).join(",")}</p></div>
            
        </div>
        </>
    )
}