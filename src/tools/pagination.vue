<template>
    <nav>
      <ul class="pagination">
        <li :class="{'disabled': current == 1}"><a  href="javascript:;" @click="setCurrent(current - 1)"> « </a></li>
        <li :class="{'disabled': current == 1}"><a   href="javascript:;" @click="setCurrent(1)"> First </a></li>
        <li  v-for="p in grouplist" :class="{'active': current == p.val}"><a href="javascript:;"
                                                                            @click="setCurrent(p.val)"> {{ p.text }} </a>
        </li>
        <li :class="{'disabled': current == page}"><a   href="javascript:;" @click="setCurrent(page)"> Last </a></li>
        <li  :class="{'disabled': current == page}"><a  href="javascript:;" @click="setCurrent(current + 1)"> »</a></li>
      </ul>
    </nav>
</template>
  
<script>
  export default{
    name:"Pagination",
    data(){
      return {
        current: this.currentPage
      }
    },

    props: {
      total: {
        type: Number,
        default: 0
      },
      display: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pagegroup: {
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      },
      handlepagechange: {
        required: true
      }
      
      
    },

    computed: {
      page: function () { 
        return Math.ceil(this.total / this.display);
      },
      grouplist: function () { 

        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }

        while (len--) {
          temp.push(this.page - len);
        };

        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.handlepagechange(this.current)
        }
      }
    }
  }
</script>
  
<style scoped>
  .pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    height: 50px;
  }
  .pagination li {
    float: left;
    height: 31px;
    border-radius: 5px;
    margin: 3px;
    color: #666;
  }
  .pagination li a{
      color: #666;
      border: 1px solid #ccc;
  }
  .pagination li:hover {
    background: #0d76a2;
  }
 .pagination li:hover  a {
    color: #fff;
    border: 1px solid #0d76a2
  }
  .pagination a {
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    border-radius: 5px;
    text-decoration: none
  }
  .pagination li.active{
    background: #0d76a2;

  }
  .pagination li.active a{
    color: #fff;
    border: 1px solid #0d76a2
  }

</style>
