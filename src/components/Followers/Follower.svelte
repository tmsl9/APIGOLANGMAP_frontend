<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { isAuthenticated, updateStore } from "../../stores/store";
    import { auth } from "../../Routes.svelte";
    import AssocFollower from "./AssocFollower.svelte";
    import ListFollowers from "./ListFollowers.svelte";

    let isMounting = true;
    let listFollowersCompo;

    onMount(async () => {
        // se calhar esta condição não faz sentido, visto que ao fazer
        // o seguinte pedido já se vê se está realmente autenticado.
        if (isAuthenticated()) {
            const response = await axios.get(auth.getUser);

            if (response.status === 200) {
                updateStore( response.data.user.ID, response.data.user.username, response.data.user.isSOSActivated, null, null);
                isMounting = false;
            }
        }
    });
</script>

{#if !isMounting}
<div id="card" style="margin-top:4.5%">
	<div id="card-content">
		<div id="card-title">
			<h2>Add Follower</h2>
			<div class="underline-title"></div>
		</div>
	</div>
    <AssocFollower on:follower_added={(event) => { listFollowersCompo.updateFollowers(event.detail.followers) }} />
        <div class="col-sm-12" style="width:100%; display:flex; justify-content:center;align-items:center;" >
            <div id="card-content">
                    <div id="card-title">
                            <h2>List Followers</h2>
                            <div class="underline-title"></div>
                    </div>
            </div>
    </div>
    <div class="col-sm-12" style="margin-top:0px; width:100%; display:flex; justify-content:center;align-items:center;" >
            <div class="row" style="margin-top:2%;height:255px;width:100%; overflow-y: scroll">
            
                    
                <ListFollowers bind:this={listFollowersCompo} />
            </div>
    </div>
    </div>
{/if}




<style>

	.submit {
	  background: -webkit-linear-gradient(right, #ffd900 0%, #ed9121 100%);
	  border: none;
	  border-radius: 21px;
	  box-shadow: 0px 1px 8px #24c64f;
	  cursor: pointer;
	  color: white;
	  font-family: "Raleway SemiBold", sans-serif;
	  height: 42.3px;
	  margin: 0 auto;
	  margin-top: 10px;
	  transition: 0.25s;
	  height:max-content;
	  width: 120px;
	}
	.submit:hover {
	  box-shadow: 0px 1px 18px #24c64f;
	}
		.map :global(.marker-text) {
			width:100%;
			text-align:center;
			font-weight:600;
			background-color:#444;
			color:#EEE;
			border-radius:0.5rem;
		}
		
		.map :global(.map-marker) {
			width:30px;
			transform:translateX(-50%) translateY(-25%);
		}
		section {
		  padding-top: 5%;
	
		}
	  
		h2{
			color:black;
		}
	  
		section a {
		  text-decoration: none;
		}
	  
		.wave-img {
		  width: 100%;
		  height: auto;
		}
		
		form{
			padding: 2%;
		}
		a {
	  text-decoration: none;
	}
	
	label {
	  font-family: "Raleway", sans-serif;
	  font-size: 11pt;
	}
	#forgot-pass {
	  color: #2dbd6e;
	  font-family: "Raleway", sans-serif;
	  font-size: 10pt;
	  margin-top: 3px;
	  text-align: right;
	}
	#card {
	  background: #fbfbfb;
	  border-radius: 8px;
	  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
	  height: auto;
	  margin: 6rem auto 8.1rem auto;
	  margin-top: 3px;
	  width: 500PX;
	
	}
	#card-content {
	  padding: 12px 44px;
	}
	#card-title {
	  font-family: "Raleway Thin", sans-serif;
	  letter-spacing: 4px;
	  padding-bottom: 23px;
	  padding-top: 13px;
	  text-align: center;
	}
	#signup {
	  color: #2dbd6e;
	  font-family: "Raleway", sans-serif;
	  font-size: 10pt;
	  margin-top: 16px;
	  text-align: center;
	}
	#submit {
	  background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
	  border: none;
	  border-radius: 21px;
	  box-shadow: 0px 1px 8px #24c64f;
	  cursor: pointer;
	  color: white;
	  font-family: "Raleway SemiBold", sans-serif;
	  height: 42.3px;
	  margin: 0 auto;
	  margin-top: 50px;
	  transition: 0.25s;
	  width: 153px;
          display: flex;
          justify-content: center;
	}
	#submit:hover {
	  box-shadow: 0px 1px 18px #24c64f;
	}
	.form {
	  align-items: left;
	  display: flex;
	  flex-direction: column;
	}
	.form-border {
	  background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
	  height: 1px;
	  width: 100%;
	}
	.form-content {
	  background: #fbfbfb;
	  border-radius: 8px;
	  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
	
	  padding-top: 14px;
	}
	.underline-title {
	  background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
	  height: 2px;
	  margin: -1.1rem auto 0 auto;
	  width: 89px;
	}
	
	h4 {
	  margin: 2rem 0rem 1rem;
	}
	
	
</style>