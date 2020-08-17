export default {
  adminImages(state) {
    if (state.images.length) {
      return (
        state.images.map(img => {
          return {
            ...img,
            url: !img.url ? URL.createObjectURL(img.blob) : img.url
          };
        }) || []
      );
    }
  }
};
