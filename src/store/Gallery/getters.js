export default {
  userImages(state) {
    if (state?.images?.length > 0) {
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
