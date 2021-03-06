import apiClient, { WALLPAPERS } from '../config/apiClient';

export function getWallpapers(category = '', search = '', limit) {
  const type = `GET_WALLPAPERS`;

  limit = limit || 25;
  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
    apiClient
      .get(`${WALLPAPERS}?category=${category}&search=${search}`)
      .then(response => {
        dispatch({ type: `${type}_FULFILLED`, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: `${type}_REJECTED`, payload: err });
      });
  };
}

export function uploadFinish() {
  return function(dispatch) {
    dispatch({ type: `UPLOAD_WALLPAPER_FINISHED` });
  };
}

export function uploadWallpaper(wallpaper) {
  const type = `UPLOAD_WALLPAPER`;

  let data = new FormData();

  wallpaper.files.forEach(function (f, i) {
    data.append('file' + i, f);
  });

  data.append('count', wallpaper.files.length);
  data.append('author_email', wallpaper.author_email);
  data.append('description', wallpaper.description);
  data.append('logoSize', wallpaper.logoSize);

  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
    apiClient
      .post(WALLPAPERS, data)
      .then(response => {
        dispatch({ type: `${type}_FULFILLED`, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: `${type}_REJECTED`, payload: err });
      });
  };
}

export const selectWallpaper = wallpaper => {
  return dispatch => {
    dispatch({
      type: 'GET_WALLPAPER_FULFILLED',
      payload: wallpaper,
    });
  };
};

export function getWallpaper(id) {
  const type = 'GET_WALLPAPER';
  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
    apiClient
      .get(`${WALLPAPERS}${id}/`)
      .then(response => {
        dispatch({ type: `${type}_FULFILLED`, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: `${type}_REJECTED`, payload: err });
      });
  };
}

export function likeWallpaper(id) {
  const type = `WALLPAPER_ACTIVITY`;
  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
    apiClient
      .post(`${WALLPAPERS}${id}/like/`)
      .then(response => {
        dispatch({ type: `${type}_FULFILLED`, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: `${type}_REJECTED`, payload: err });
      });
  };
}

export function reportWallpaper(id) {
  const type = `WALLPAPER_ACTIVITY`;
  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
    apiClient
      .post(`${WALLPAPERS}${id}/report/`)
      .then(response => {
        dispatch({ type: `${type}_FULFILLED`, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: `${type}_REJECTED`, payload: err });
      });
  };
}
