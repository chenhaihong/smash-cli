import axios from 'axios';

export default class IndexSerivce {
  static async getList() {
    const res = await axios({
      method: 'get',
      url: '/list',
    });

    // 如果需要，在这里重组数据
    const { list } = res.data;
    return list;
  }

  static async getProfile() {
    const res = await axios({
      method: 'post',
      url: '/user/profile',
      data: {
        uid: 1,
      },
    });

    // 如果需要，在这里重组数据
    return res.data;
  }
}
