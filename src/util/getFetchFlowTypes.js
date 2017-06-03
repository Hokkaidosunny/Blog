export default function (type) {
  return {
    fetchStartType: `${type}_START`,
    fetchSuccessType: `${type}_SUCCESS`,
    fetchFailType: `${type}_FAIL`
  };
}
