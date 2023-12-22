export const getTable = async(data=[], page_no=1, month=-1, query='')=>{
    const result = data.filter(e => {
        return ((!query ? true : (e.title.toLowerCase().includes(query.toLowerCase()) ||
                                    e.description.toLowerCase().includes(query.toLowerCase()) ||
                                    e.price.toString().toLowerCase().includes(query.toLowerCase()))))
            &&
            (month === -1 ? true : (new Date(e['dateOfSale']).getUTCMonth()===month));
    }).sort((a, b)=> a.id<b.id);
    const pages = Math.ceil(result.length/10);
    const paginated = result.slice((page_no-1)*10, page_no*10);
    return {pages:pages, data:paginated};
}