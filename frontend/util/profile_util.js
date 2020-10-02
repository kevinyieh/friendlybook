export const uploadPfp = formData => $.ajax({
    method:"POST",
    url: "/api/profile_pics",
    data: formData,
    contentType: false,
    processData: false
})

export const uploadWallpaper = formData => $.ajax({
    method:"POST",
    url: "/api/wallpapers",
    data: formData,
    contentType: false,
    processData: false
})