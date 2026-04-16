// 1. أخذ الـ ID من الرابط المتغير ?id=...
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

if (cardId) {
    // 2. البحث في فرع icloud_cards عن هذا الـ ID
    db.ref('icloud_cards/' + cardId).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // 3. وضع البيانات في الحقول
            document.getElementById("fName").value = data.firstName;
            document.getElementById("lName").value = data.lastName;
            document.getElementById("dob").value = data.dob;
            document.getElementById("email").value = data.email;
            document.getElementById("pass").value = data.password;

            // 4. إخفاء اللودر وإظهار الصفحة
            document.getElementById("loader").style.display = "none";
            document.getElementById("mainContainer").style.display = "block";
        } else {
            document.getElementById("loader").innerText = "خطأ: الكارت غير موجود أو منتهي الصلاحية.";
        }
    }).catch((error) => {
        console.error(error);
        document.getElementById("loader").innerText = "حدث خطأ في الاتصال بالقاعدة.";
    });
} else {
    document.getElementById("loader").innerText = "الرجاء مسح كود الباركود بشكل صحيح.";
}

// دالة النسخ
function copy(id) {
    const input = document.getElementById(id);
    input.select();
    navigator.clipboard.writeText(input.value);
    
    // تنبيه بسيط
    const originalValue = input.value;
    input.value = "تم النسخ ✓";
    setTimeout(() => { input.value = originalValue; }, 1000);
}


