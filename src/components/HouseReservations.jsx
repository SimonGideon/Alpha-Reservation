import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchHouseReservations } from '../redux/reservations/reservationsSlice';
import { fetchHouse } from '../redux/houses/housesSlice';

const HouseReservations = (props) => {
  const dispatch = useDispatch();
  const { houseReservationsList } = useSelector((store) => store.reservations);
  const { currentHouse } = useSelector((store) => store.houses);
  const { authorized } = props;
  const houseId = window.location.href.split('/')[4];
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate('/');
    }
  }, [authorized, navigate]);

  useEffect(() => {
    dispatch(fetchHouseReservations(houseId));
  }, [dispatch, houseId]);
  useEffect(() => {
    dispatch(fetchHouse(houseId));
  }, [dispatch, houseId]);
  return (
    <div className="w-full flex flex-col items-center py-[20px]">
      <h1 className="font-black text-4xl text-center my-[20px]">
        {`${currentHouse.name} `}
        Reservations Details
      </h1>
      <img src={currentHouse ? currentHouse.photo : 'loading...'} alt="house" />
      <p className="p-4 text-2xl">
        Description:
        {' '}
        {currentHouse ? currentHouse.description : 'loading...'}
      </p>
      <p className=" p-4 text-2xl flex">
        Location:
        {' '}
        <MdLocationOn size={22} />
        {' '}
        {currentHouse ? currentHouse.city : 'loading...'}
        ,
        {' '}
        {currentHouse ? currentHouse.address : 'loading...'}
      </p>
      <p className="text-[20px] p-3 font-semibold">
        Important Note: Here is all the reserved information for
        {' '}
        {currentHouse.name}
        {' '}
        House that will help you choose an empty time slots to reserve
      </p>
      <table className="w-[50%] border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300  text-center">Check-in</th>
            <th className="py-2 px-4 border border-gray-300 text-center">Check-out</th>
          </tr>
        </thead>
        <tbody>

          {houseReservationsList ? houseReservationsList.map((reservation) => (
            <tr key={`house-reservation-${reservation.id}`}>
              <td className="py-8 px-4 border border-gray-300 text-center"><span className="bg-green-500 text-white-100 p-3 rounded-full">{reservation.check_in}</span></td>
              <td className="py-8 px-4 border border-gray-300 text-center"><span className="bg-red-500 text-white-100 p-3 rounded-full">{reservation.check_out}</span></td>
            </tr>
          )) : '...loading'}

        </tbody>
      </table>
    </div>
  );
};
HouseReservations.propTypes = {
  authorized: PropTypes.bool.isRequired,
};

export default HouseReservations;
