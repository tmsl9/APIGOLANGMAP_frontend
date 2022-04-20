<script>
    //Row component is optional and only serves to render odd/even row, you can use <tr> instead.
    //Sort component is optional
    import { onMount } from "svelte";
    import Table, { Pagination, Row, Search, Sort } from "./Table.svelte";
    import { getAll } from "./server.js";
    import { sortNumber, sortString } from "./sorting.js";
    import { coordinates, currentCoordinates, updateCoordinates } from "../stores/store";

    let rows = []
    let page = 0; //first page
    let pageSize = 3; //optional, 10 by default

    function formatDate(d) {
		var date = new Date(d);
		return ("00" + (date.getMonth() + 1)).slice(-2)
				+ "/" + ("00" + date.getDate()).slice(-2)
				+ "/" + date.getFullYear() + " "
				+ ("00" + date.getHours()).slice(-2) + ":"
				+ ("00" + date.getMinutes()).slice(-2)
				+ ":" + ("00" + date.getSeconds()).slice(-2);
	}

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
        {#if $coordinates.coords !== undefined}
            {#each $coordinates.coords as coords}
                <tr>
                    <td>{formatDate(coords.UpdatedAt)}</td>
                    <td>{coords.Latitude}</td>
                    <td>{coords.Longitude}</td>
                    <td>{$coordinates.type}</td>
                </tr>
            {/each}
        {/if}

    </tbody>
  </Table>

  	<!-- <div class="row" style="margin-top:2%">
		<table class="table table-bordered">
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Latitude</th>
					<th scope="col">Longitude</th>
					<th scope="col">Type</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				{#if $coordinates.coords !== undefined}
					{#each $coordinates.coords as coords}
						<tr>
							<th scope="row">{formatDate(coords.UpdatedAt)}</th>
							<td>{coords.Latitude}</td>
							<td>{coords.Longitude}</td>
							<td>{$coordinates.type}{coords.ID !== undefined ? coords.ID : ""}</td>
							<td>
								{#if $coordinates.type !== type.current && $coordinates.type !== type.followers}
									<button type="button"  id={coords.ID} class="btn btn-danger"
											style="padding:3px 7px;border-radius:100%;background-color:red"
											on:click={() => delete_location(coords.ID)}>
										<i class="far fa-trash-alt"></i>
									</button>
								{/if}
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table> 
	</div>-->