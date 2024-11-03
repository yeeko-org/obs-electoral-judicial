
export function resizeImg(img, size1 = 0, size2 = 0) {
  if (!size1 && !size2)
    size1 = 400
  if (typeof img !== 'undefined') {
    if (img.filename)
      return `//img2.storyblok.com/${size1}x${size2}${img.filename.replace('https://a.storyblok.com', '')}`
  }
  return null
}

export function transformImage(image, option) {
  if (!image) return ''
  if (!option) return ''

  let imageService = '//img2.storyblok.com/'
  let path = image.filename.replace('https://a.storyblok.com', '')
  return imageService + option + path
}
