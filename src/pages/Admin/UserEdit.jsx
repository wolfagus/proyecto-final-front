import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormCreateUser from '../../components/FormUser/FormCreateUser';
import { getOneUser } from '../../services/userService';

const UserEdit = () => {
  const { _id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data } = await getOneUser(_id);
      setUser(data)
      setLoading(false);
    }
    getUser();
  }, [_id]);


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin</h1>
      {/* <button className="btn btn-primary my-3" onClick={() => setCreateProduct(!createProduct)}>
        {createProduct ? 'Ver Tabla' : 'Agregar producto'}
      </button> */}
      <FormCreateUser isEdit user={user} isEditLoading={loading} userId={_id}/>
    </div>
  );
};

export default UserEdit;