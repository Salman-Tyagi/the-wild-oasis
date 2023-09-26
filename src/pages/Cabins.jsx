import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import { useState } from 'react';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Sort / Filter</p>
      </Row>
      <Row>
        <CabinTable />
        {!showForm && (
          <Button onClick={() => setShowForm(show => !show)}>Add Cabin</Button>
        )}
        {showForm && <CreateCabinForm setShowForm={setShowForm} />}
      </Row>
    </>
  );
}

export default Cabins;
