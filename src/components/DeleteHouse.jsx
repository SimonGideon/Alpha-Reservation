import { FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { fetchHouses } from '../redux/houses/housesSlice';
import { deleteHouse } from '../redux/houses/deleteHouseSlice';

const DeleteHouse = () => {
  const dispatch = useDispatch();
  const { housesList } = useSelector((store) => store.houses);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  const handleDelete = (houseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this house!',
      icon: 'warning',
      confirmButtonColor: '#96BF01',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteHouse(houseId)).then(() => {
          Swal.fire('Deleted!', 'The house has been deleted.', 'success').then(() => {
            window.location.reload();
          });
        });
      }
    });
  };

  return (
    <div className="container mx-auto">
      <ul className="flex flex-col">
        {housesList.map((house) => (
          <div key={house.id} className="bg-white shadow rounded-lg p-4 m-4 relative">
            <img className="w-full rounded-lg h-auto mb-4" src={house.photo} alt={house.name} />
            <div className="absolute top-6 right-5 bg-[#FFA500] text-white p-1 rounded-lg">
              <span className="font-bold">
                $
                {house.night_price}
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="uppercase text-xl font-bold mb-2">{house.name}</h1>
                <p className="mb-2">
                  <FiInfo className="inline mr-1" />
                  {house.description}
                </p>
                <p className="mb-2">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {house.address}
                </p>
                <p className="mb-2">
                  <FaCity className="inline mr-1" />
                  {house.city}
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete(house.id)}
                  className="bg-[#96BF01] hover:bg-[#FFA500] text-white rounded px-4 py-2 mt-4"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>

  );
};

export default DeleteHouse;
