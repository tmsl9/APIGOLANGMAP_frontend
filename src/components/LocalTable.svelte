<script>
    //Row component is optional and only serves to render odd/even row, you can use <tr> instead.
    //Sort component is optional
    import { onMount } from "svelte";
    import Table, { Pagination, Row, Search, Sort } from "./Table.svelte";
    import { getAll } from "./server.js";
    import { sortNumber, sortString } from "./sorting.js";
  
    let rows = [];
    let page = 0; //first page
    let pageSize = 5; //optional, 10 by default
  
    onMount(async () => {
      rows = await getAll();
    });
  
    function onCellClick(row) {
      alert(JSON.stringify(row));
    }
  
    function onSortString(event) {
      event.detail.rows = sortString(
        event.detail.rows,
        event.detail.dir,
        event.detail.key
      );
    }
  
    function onSortNumber(event) {
      event.detail.rows = sortString(
        event.detail.rows,
        event.detail.dir,
        event.detail.key
      );
    }
  </script>
  
  <Table {page} {pageSize} {rows} let:rows={rows2}>
    <thead slot="head">
      <tr>
        <th>
            Date
          <Sort key="Date" on:sort={onSortString} />
        </th>
        <th>
            Latitude
          <Sort key="Latitude" on:sort={onSortString} />
        </th>
        <th>
            Longitude
          <Sort key="Longitude" on:sort={onSortNumber} />
        </th>
        <th>
            Type
          <Sort key="Type" on:sort={onSortNumber} />
        </th>
      </tr>
    </thead>
    <tbody>
      {#each rows2 as row, index (row)}
        <Row {index} on:click={() => onCellClick(row)}>
          <td data-label="Date">{row.name}</td>
          <td data-label="Latitude">{row.lastName}</td>
          <td data-label="Longitude">{row.age}</td>
          <td data-label="Type">{row.age}</td>
        </Row>
      {/each}
    </tbody>
  </Table>