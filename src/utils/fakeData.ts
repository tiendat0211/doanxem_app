import { IMG_LOGO, IMG_POST, IMG_ONBOARDING } from "../assets/path";
import { StatusModel } from "../model/StatusModel";


export const fakePost: StatusModel[] = [
  {
    post_id: 1,
    user: {
      id: 102,
      avatar: IMG_LOGO,
      name: '_designtoichet_'
    },
    time: '4 giờ trước',
    status_content: '@conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so',
    status_img: IMG_POST,
    comment_counts: '2,5k',
    reaction_counts: '1,2k',
  },

  {
    post_id: 1,
    user: {
      id: 102,
      avatar: IMG_LOGO,
      name: '_designtoichet_'
    },
    time: '4 giờ trước',
    status_content: '@conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so',
    status_img: IMG_ONBOARDING,
    comment_counts: '2,5k',
    reaction_counts: '1,2k',
  }
]

export const FakeTabs = [
  {
    script: 'Bài viết',
    type: 'post'
  },
  {
    script: 'Người dùng',
    type: 'user'
  },
  {
    script: 'Tag',
    type: 'tag'
  },
  {
    script: 'Bộ lạc 1',
    type: 'bolac1'
  },
]

export const fakeUserLists = [
    {
        id :1,
        name : '_Nghiencoliemsi_',
        user_name:'@ngoclongg2010',
        avatar: IMG_LOGO
    },
    {
        id :2,
        name : 'Kenghiensitinh',
        user_name:'@ngoclongg',
        avatar: IMG_LOGO
    },
    {
        id :3,
        name : 'Nghiensi5cham0',
        user_name:'@longg2010',
        avatar: IMG_LOGO
    },
    {
        id :4,
        name : 'Nghienem',
        user_name:'@ngoc2010',
        avatar: IMG_LOGO
    },
    {
        id :5,
        name : 'Nghienkehitco',
        user_name:'@vulong2010',
        avatar: IMG_LOGO
    },
]
export const fakeTags = [
  {
    id:1,
    name:'Art'
  },
  {
    id:2,
    name:'Culture'
  },
  {
    id:3,
    name:'Design'
  },
  {
    id:4,
    name:'Production'
  },
  {
    id:5,
    name:'Game'
  },
]