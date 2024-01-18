import './styles/table.css';

// component to render table
const Table = (props) => {
  const data = props.data;  // paginated data

  return (
    <div className="table-wrapper" >
      <table  className='my-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td><input className='form-check-input' type='checkbox' checked={item.sold} disabled/></td>
              <td><img src={item.image}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
