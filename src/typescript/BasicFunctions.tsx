
const addTwoNumbers = (a: number, b: number): string => {
    return `${a + b}`;
}

export const BasicFunctions = () => {
    return (
        <>
            <div>BasicFunctions</div>

            <span>El Resultado de sumar 2+8 = {addTwoNumbers(2, 8)}</span>
        </>

    )
}

