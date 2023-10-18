import { useState } from 'react';
import styled from 'styled-components';
import {
  HiOutlineDuplicate,
  HiOutlinePencilAlt,
  HiOutlineXCircle,
} from 'react-icons/hi';

import CreateCabinForm from './CreateCabinForm';

import useDeleteCabin from './useDeleteCabin';
import useCreateCabin from './useCreateCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deletingCabin } = useDeleteCabin();
  const { isCreating, creatingCabin } = useCreateCabin();

  const {
    _id: cabinId,
    image,
    maxCapacity,
    regularPrice,
    discount,
    name,
    description,
  } = cabin;

  function deleteCabinHandle() {
    deletingCabin(cabinId);
  }

  function handleDuplicateCabin() {
    creatingCabin({
      name: `{copy of} ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <>
      <TableRow>
        <Img src={image} alt={`image of cabin ${name}`} />
        <Cabin>{name}</Cabin>
        <div>max capacity of {maxCapacity}</div>
        <Price>{regularPrice}</Price>
        <Discount>{discount}</Discount>
        <div
          // temporary
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontSize: '2rem',
          }}
        >
          <HiOutlineDuplicate onClick={handleDuplicateCabin} />
          <HiOutlinePencilAlt onClick={() => setShowForm(show => !show)}>
            Edit
          </HiOutlinePencilAlt>
          <HiOutlineXCircle disabled={isDeleting} onClick={deleteCabinHandle}>
            Delete
          </HiOutlineXCircle>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
