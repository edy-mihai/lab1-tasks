
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        const fullname = document.getElementById("name").value.trim();
        const namePattern = /^[A-Za-z\s]+$/;
        if (fullname.length < 5 || !namePattern.test(fullname)) {
            alert("Full Name must contain at least 5 characters and include only letters and spaces.");
            e.preventDefault();
            return;
        }

        const email = document.getElementById("email").value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@e-uvt\.ro$/;
        if (!emailPattern.test(email)) {
            alert("Email must be valid and end with the domain @e-uvt.ro.");
            e.preventDefault();
            return;
        }

        
        const phone = document.getElementById("phone").value.trim();
        const phonePattern = /^[0-9]{10}$/;
        if (phone !== "" && !phonePattern.test(phone)) {
            alert("The Phone field must contain exactly 10 digits.");
            e.preventDefault();
            return;
        }

        if (document.getElementById("subject").value === "") {
            alert("The Subject field is mandatory.");
            e.preventDefault();
            return;
        }
        if (document.getElementById("msg").value.trim() === "") {
            alert("The Message field cannot be empty.");
            e.preventDefault();
            return;
        }

        const hearOptions = document.getElementsByName("satisfiability");
        let radioSelected = false;
        for (let opt of hearOptions) {
            if (opt.checked) {
                radioSelected = true;
                break;
            }
        }
        if (!radioSelected) {
            alert("Please select an option indicating how satisfied you were with your experience.");
            e.preventDefault();
            return;
        }

        const dob = new Date(document.getElementById("dob").value);
        const today = new Date();
        let ageFromDate = today.getFullYear() - dob.getFullYear();
        if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
            ageFromDate--;
        }
        if (isNaN(dob.getTime()) || ageFromDate < 18) {
            alert("You must be at least 18 years old.");
            e.preventDefault();
            return;
        }

        const ageVal = parseInt(document.getElementById("age").value);
        if (isNaN(ageVal) || ageVal < 18 || ageVal > 60) {
            alert("Age must be between 18 and 60.");
            e.preventDefault();
            return;
        }

        const website = document.getElementById("website").value;
        if (!website.startsWith("https://")) {
            alert("Website URL must start with https://.");
            e.preventDefault();
            return;
        }

        const fileInput = document.getElementById("fileUpload");
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const extension = file.name.split('.').pop().toLowerCase();
            const validExtensions = ['pdf', 'docx'];
            if (!validExtensions.includes(extension)) {
                alert("Only .pdf or .docx files are accepted.");
                e.preventDefault();
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must not exceed 2MB.");
                e.preventDefault();
                return;
            }
        }

        if (document.getElementById("favColor").value === "") {
            alert("Color input is mandatory.");
            e.preventDefault();
            return;
        }

        if (!confirm("Are you sure you want to submit the form?")) {
            e.preventDefault();
        }
    });