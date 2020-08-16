export default {
  adminImages(state) {
    console.log("GETTER", state);
    if (state?.images?.length > 0) {
      return (
        state.images.map(img => {
          return { ...img, url: URL.createObjectURL(img.blob) };
        }) || []
      );
    }
  }
};
