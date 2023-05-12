import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/users/usersSlice";

function FetchedUsers() {
  const dispatch = useDispatch();
  const {users, isLoading, error} = useSelector((store) => store.users);

  useEffect(()=>{
    dispatch(fetchData())
  }, [dispatch]);

  if(isLoading === true) {
    return (
        <div>Loading...</div>
    );
  }

  if(error !== undefined) {
    return (
        <div>{error}</div>
    );
  }
  return (
    <>
      <ul>
        {
          users.results.map((user) => {
            return (
                <li key={user.id}>
                  {user.name.first} {user.name.last}
                </li>
            );
          })
        }
      </ul>
 
    </>

  );
}

export default FetchedUsers;
