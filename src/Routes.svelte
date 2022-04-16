<script context="module">

    export const home = new class {
        constructor() {
            this.home = "/"
        }
    }
    export const alert = new class {
        constructor() {
            this.updateAlertTime = "/alert/time/"
        }
	}
    export const auth = new class {
        constructor() {
            this.getUser = "/auth/getUser"
            this.login = "/auth/login"
            this.logout = "/auth/logout"
            this.register = "/auth/register"
            this.refresh_token = "/auth/refresh_token"
        }
	}
    export const follower = new class {
        constructor() {
            this.getAllFollowers = "/follower/"
            this.associateFollower = "/follower/assoc"
            this.deassociateFollower = "/follower/deassoc"
        }
    }
    export const position = new class {
        constructor() {
            this.registerLocation = "/position/"
            this.getMyLocation = "/position/"
            this.getLocationHistory = "/position/history"
            this.deleteLocation = "/position"
            this.getUsersLocationWithFilters = "/position/filter"
        }
	}
    export const webSocket = new class {
        constructor() {
            this.socket = "/socket"
        }
	}
</script>