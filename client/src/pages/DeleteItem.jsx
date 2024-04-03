import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteItem, getItemData} from "../utils/http";
import ListLoader from "../components/Lists/ListLoader/ListLoader";

export default function DeleteItem() {
  const params = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getItemData(params.id);
      setItemData(data);
    };
    fetchData();
  }, [params.id])

  function confirmDel(id) {
    deleteItem(id)
    navigate('/lists/items/success')
  }

  if (itemData) return <>
    <h2>Are you sure you want to delete the item {itemData.name}?</h2>
    <h2>It also deleted all orders related to this item.</h2>
    <NavLink to='/lists/items' style={{margin: '10px'}}><button>No</button></NavLink>
    <button onClick={() => confirmDel(params.id)}>Yes</button>
  </>

  return <ListLoader />
}
