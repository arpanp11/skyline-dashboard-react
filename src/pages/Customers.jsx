import React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Customers = () => {
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      {/* header */}
      <Header category='Page' title='Customers' />
      {/* grid component */}
      <GridComponent
        dataSource={customersData}
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        toolbar={['Delete', 'Edit', 'Search']}
        editSettings={{
          allowEditing: true,
          allowDeleting: true,
        }}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
