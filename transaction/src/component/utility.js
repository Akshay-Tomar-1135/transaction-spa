export const getTable = async(data=[], page_no=1, month='', query='')=>{
    const result = data.filter(e => {
        return ((!query ? true : (e['title'].indexOf(query) !== -1 || e['title'].indexOf(query) !== -1 || e['title'].indexOf(query) !== -1))
            &&
            (month === -1 ? true : (new Date(e['dateOfSale']).getUTCMonth()===month)));
    }).sort((a, b)=> a.id<b.id).slice((page_no-1)*10, page_no*10);
    return {pages:result.length, data:result};
}