
// processes if a wild pokemon has fainted
export const processWildState = (state, isFinalBoss = false) => {
    const activeWild = state.wild[state.activeWildIndex];

    if (activeWild.hp > 0) return state;

    // if wild pokemon has fainted, update battle state
    const updatedWild = [...state.wild];
    const faintedPokemon = { ...activeWild, hp: 0, alive: false };
    updatedWild[state.activeWildIndex] = faintedPokemon;

    // add to caught list
    const updatedCaught = isFinalBoss
        ? [...state.caught] // do not add hess to caught array lol
        : [...state.caught, faintedPokemon];

    const nextWildIndex = state.activeWildIndex + 1;
    const isFinished = nextWildIndex >= state.wild.length;

    return {
        ...state,
        wild: updatedWild,
        caught: updatedCaught,
        activeWildIndex: isFinished ? state.activeWildIndex : nextWildIndex,
        status: isFinished ? "finished" : state.status,
    };
};

// processes if a caught pokemon has fainted
export const processCaughtState = (state) => {
    const activeCaught = state.caught[state.activeCaughtIndex];
    if (activeCaught.hp > 0) return state;

    const updatedCaught = [...state.caught];
    const faintedPokemon = { ...activeCaught, hp: 0, alive: false };
    updatedCaught[state.activeCaughtIndex] = faintedPokemon;

    const nextCaughtIndex = updatedCaught.findIndex(p => p.alive);
    const isFailed = updatedCaught.every(p => !p.alive);

    return {
        ...state,
        caught: updatedCaught,
        activeCaughtIndex: isFailed ? state.activeCaughtIndex : nextCaughtIndex,
        status: isFailed ? "failed" : state.status,
    };
};

export const isSuperEffective = (attackerTypes, targetTypes, typeMap) => {
    return attackerTypes.some(attackerType =>
        targetTypes.some(targetType => typeMap[attackerType]?.includes(targetType))
    );
};

export const playerAttack = (state, levelNumber) => {
    const next = { ...state };
    const wild = [...next.wild];
    const target = { ...wild[next.activeWildIndex] };

    target.hp -= 0.2;
    wild[next.activeWildIndex] = target;
    next.wild = wild;

    const newState = processWildState(next, Number(levelNumber) === 5);
    return newState;
};

export const caughtPokemonAttack = (state, typeMap, levelNumber) => {
    const next = { ...state };
    const wild = [...next.wild];
    const caught = [...next.caught];

    if (!caught.some(p => p.alive)) return state;

    const attacker = { ...caught[next.activeCaughtIndex] };
    const target = { ...wild[next.activeWildIndex] };

    const baseDamage = Math.round(attacker.attack / 10);
    const attackValue = isSuperEffective(attacker.types, target.types, typeMap)
        ? baseDamage * 2
        : baseDamage;

    target.hp -= attackValue;
    wild[next.activeWildIndex] = target;
    next.wild = wild;

    return processWildState(next, Number(levelNumber) === 5);
};

export const wildPokemonAttack = (state, typeMap) => {
    const next = { ...state };
    const wild = [...next.wild];
    const caught = [...next.caught];

    if (!caught.some(p => p.alive)) return state;

    const attacker = { ...wild[next.activeWildIndex] };
    const target = { ...caught[next.activeCaughtIndex] };

    const baseDamage = Math.round(attacker.attack / 10);
    const attackValue = isSuperEffective(attacker.types, target.types, typeMap)
        ? baseDamage * 2
        : baseDamage;

    target.hp -= attackValue;
    caught[next.activeCaughtIndex] = target;
    next.caught = caught;

    return processCaughtState(next);
};

export const handleTimeout = (state, initialTime) => {
    if (!state) return { state, resetTime: initialTime };

    const nextWildIndex = state.activeWildIndex + 1;
    const isFinished = nextWildIndex >= state.wild.length;

    const newState = {
        ...state,
        activeWildIndex: isFinished ? state.activeWildIndex : nextWildIndex,
        status: isFinished ? "finished" : state.status,
    };

    return { battleState: newState, resetTime: initialTime };
};