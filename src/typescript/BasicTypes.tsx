export const BasicTypes = () => {
    const name: string = 'César';
    const age: number = 38;
    const isActive: boolean = false;
    const powers: string[] = ['Velocidad', 'Volar', 'Respirar en el agua', 'Fuerza'];

    return (
        <div>
            <h2>Basic Types</h2>
            <ul>

                <li>Name: {name}</li>
                <li>Age: {age}</li>
                <li>Active: {isActive ? 'Yes' : 'No'}</li>

            </ul>
            <h2>Powers:</h2>
            <ul>
                {powers.map((power) => (
                    <li key={power}>{power}</li>
                ))}
            </ul>

        </div>
    )
}
