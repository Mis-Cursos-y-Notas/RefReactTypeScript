interface Person {
    age: number;
    firstName: string;
    lastName: string;
    address: Address
}

interface Address {
    country: string;
    city: string;
    street: string;
    house?: number;
}

export const ObjectLiterals = () => {

    const person: Person = {
        age: 38,
        firstName: 'César',
        lastName: 'Forero',
        address: {
            country: 'Colombia',
            city: 'Bogotá',
            street: 'Calle 1 # 2 - 3',
            house: 5
        }
    }


    return (
        <>
            <div>ObjectLiterals</div>

            <pre>{JSON.stringify(person, null, 2)}</pre>

        </>


    )
}
