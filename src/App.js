import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://api.npoint.io/dee51ea017d20efdfcc8')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])


  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text( "user pdf", 10, 10);
    doc.autoTable({
      head: [["name", "author", "published"]],
      body: data.map((user) => [ user.name, user.author, user.published]),
    });
    doc.save("users.pdf");
    
  };
  return (
    
    <table className="table w-75 mx-auto">
  <thead>
  <h3 >PDF EXPLORER</h3>
    <tr>
   
      <th scope="col">name</th>
      <th scope="col">author</th>
      <th scope="col">published</th>
      <th scope="col">view</th>
    </tr>
  </thead>
  <tbody>
    {
    data.map((user, index) => {
      return <tr key={index}>
        <td>{user.name}</td>
        <td>{user.author}</td>
        <td>{user.published}</td>
       <td onClick={exportToPDF}> <i class='bx bx-show'></i></td>
      </tr>
    })
    }
  </tbody>
</table>
  )

 
}

export default App;