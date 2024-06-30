class NavComponent extends HtmlComponent{
    static name = "nav"
    isVisible = true;
    accountDropdownOpen = false;

    createContent() {
        return `
            <div class="navbar">
                <div class="home-link">Home</div>
                <div class="points-display">
                    Points: <span class="points-display-num">0</span>
                </div>
                <div class="account-dropdown-wrapper">
                    <div class="account-dropdown">
                        <div class="username-link">Login</div>
                        <div class="account-options">
                            <div class="logout-button option">Logout</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-visibility-button">
                ^
            </div>
            <div class="nav-shift-fix"></div>
        `;
    }

    onCreated(){

    }

    addEvents() {
        this.addInnerClickListener("navbar-visibility-button",(e,target) => {
            this.isVisible = !this.isVisible;
            if(this.isVisible){
                this.style.height = "var(--navbar-height)";
                target.style.transform = "scaleY(1) translateY(0px)";

                this.setVisibilityForInner("visible")
            }else{
                this.style.height = "0";
                target.style.transform = "scaleY(-1) translateY(5px)";

                this.setVisibilityForInner("hidden")
            }
        })

        this.addInnerClickListener("username-link",(e,target) => {
            if(userLink.innerHTML==="Login"){
                if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
                    window.location.replace("login/login.html");
                }else {
                    window.location.href = "login.html";
                }
                return;
            }

            this.accountDropdownOpen = !this.accountDropdownOpen;
            if(this.accountDropdownActive) {
                this.getInnerByClass("account-options").style.height = "20px";
                this.getInnerByClass("username-link").style.borderRadius = "0";
            }else{
                this.getInnerByClass("account-options").style.height = "0";
                this.getInnerByClass("username-link").style.borderRadius = "10px";
            }
        })
    }

    setVisibilityForInner(visibility){
        for(let child of this.getInnerByClass("navbar").children){
            child.style.visibility = visibility;
        }
    }
}

ComponentRegistry.registerHtmlComponent(NavComponent);