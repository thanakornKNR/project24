

export default function Page({ params }: { params: { id: string } }) {

    const { id } = params;
    return (
        <div> My product {id}</div>
    )
}