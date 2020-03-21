<template>
  <el-card class="top-container">
    <div slot="header">
      <span>参照设置</span>
    </div>
    <div class="tableBody">
      <div class="tree">
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="20%">
          <el-form ref="updateForm" :model="form" style="padding: 0 40px">
            <el-form-item label="參照名" label-width="80px" prop="oldPwd">
              <el-input v-model="form.appendName" minlength="1" maxlength="20" autocomplete="off" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="insertType">确定</el-button>
          </div>
        </el-dialog>
        <el-card class="treeScope">
          <el-button type="primary" class="treeButton" @click="appendNew">添加分類</el-button>
          <HR />
          <el-scrollbar class="eltree">
            <el-tree
              ref="tree"
              :expand-on-click-node="false"
              accordion
              :data="treeData"
              :load="loadNode"
              lazy
              highlight-current
            >
              <span slot-scope="{ node, data }" class="custom-tree-node" @click="getRefs(data)">
                <span>{{ node.label }}</span>
                <span style="margin-left: 50px">
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => append(node,data)"
                  >
                    添加
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => editTree(node,data)"
                  >
                    修改
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
                  >
                    刪除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </el-card>
      </div>
      <el-divider direction="vertical" />
      <div class="table">
        <div class="filter-container">
          <el-input
            v-model="searchName"
            placeholder="参照名"
            clearable
            style="width: 200px;"
            class="filter-item"
          />
          <el-button class="filter-item" type="primary" icon="el-icon-search" :disabled="type === ''" @click="search">
            搜索
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" :disabled="type === ''" @click="addRef">
            添加
          </el-button>
        </div>
        <el-card>
          <el-table :data="refData.slice((currentPage-1)*currentPageSize, currentPageSize*currentPage)" border highlight-current-row height="600px">
            <el-table-column align="center" type="index" label="序号" width="180" />
            <el-table-column align="center" prop="name" label="參照名" width="300" show-overflow-tooltip>
              <template slot-scope="{row}">
                <template v-if="row.edit">
                  <el-input v-model="row.name" maxlength="50" class="edit-input" size="small" />
                </template>
                <span v-else>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.edit" type="success" size="small" @click="sure(scope.row)">确定</el-button>
                <el-button v-if="scope.row.edit" size="small" @click="cannel(scope.row)">取消</el-button>
                <el-button v-if="!scope.row.edit" type="warning" size="small" @click="edit(scope.row)">修改</el-button>
                <el-button v-if="!scope.row.edit" type="danger" size="small" @click="deleteRef(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="float: right"
            node-key="id"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="currentPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="refData.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </div>
    </div>
    <div />
  </el-card>
</template>

<script>
import { getAllTypes, getChildren, addType, deleteType, getRef, resetRefName, resetTypeName, addRef, deleteRef } from '../../api/ref'
export default {
  name: 'Index',
  data() {
    return {
      tree: '',
      treeData: [],
      refData: [],
      currentPage: 1,
      form: {
        appendName: '',
        parent: null
      },
      dialogFormVisible: false,
      searchName: '',
      chooseNode: '',
      type: '',
      opera: '',
      currentPageSize: 10,
      currentRef: []
    }
  },
  computed: {
  },
  mounted() {
    this.tree = this.$refs.tree
    getAllTypes().then(response => {
      this.treeData = response.data
    })
  },
  methods: {
    loadNode(node, resolve) {
      if (node.data.id !== undefined) {
        getChildren({ parent: node.data.id }).then(response => {
          return resolve(response.data)
        })
      } else {
        return resolve([])
      }
    },
    edit(row) {
      if (row.edit === undefined) {
        this.$set(row, 'edit', true)
      } else {
        row.edit = true
      }
    },
    deleteRef(row, index) {
      deleteRef(row).then(response => {
        this.refData.splice(index, 1)
        this.$notify({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    sure(row) {
      if (row.pk_ref !== undefined) {
        resetRefName(row).then(response => {
          row.edit = false
          this.$notify({
            type: 'success',
            message: '修改成功!'
          })
        })
      } else {
        addRef(row).then(response => {
          row.edit = false
          row = response.data
          this.$notify({
            type: 'success',
            message: '新增成功!'
          })
        })
      }
    },
    cannel(row) {
      if (row.pk_ref !== undefined) {
        row.edit = false
      } else {
        this.refData.splice(this.refData.indexOf(row), 1)
      }
    },
    handleSizeChange(size) {
      this.currentPageSize = size
    },
    handleCurrentChange(page) {
      this.currentPage = page
      console.log(this.refData.slice((this.currentPage - 1) * this.currentPageSize, this.currentPageSize * this.currentPage))
    },
    append(node, data) {
      this.chooseNode = node
      this.form.parent = data.id
      this.dialogFormVisible = true
      this.form.appendName = ''
      this.opera = 'add'
    },
    appendNew() {
      this.form.parent = null
      this.dialogFormVisible = true
      this.form.appendName = ''
      this.opera = 'add'
    },
    insertType() {
      if (this.opera === 'edit') {
        resetTypeName({ pk_type: this.chooseNode.data.id, name: this.form.appendName }).then(response => {
          this.chooseNode.data.label = this.form.appendName
          this.$notify({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogFormVisible = false
        })
      } else {
        addType(this.form).then(response => {
          if (this.form.parent != null) {
            this.tree.append(response.data, this.chooseNode)
          } else {
            this.treeData.push(response.data)
          }
          this.dialogFormVisible = false
        })
      }
    },
    remove(node, data) {
      if (node.childNodes.length > 0) {
        this.$notify({
          type: 'warning',
          message: '無法刪除有子節點數據'
        })
      } else {
        this.$confirm('你確定要刪除' + data.label + '分類嗎?', '刪除', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteType({ pk_type: data.id }).then(response => {
            this.refData = []
            this.chooseNode = ''
            this.type = ''
            this.tree.remove(node)
            this.$notify({
              type: 'success',
              message: '刪除成功!'
            })
          })
        })
      }
    },
    editTree(node, data) {
      this.chooseNode = node
      this.form.appendName = data.label
      this.dialogFormVisible = true
      this.opera = 'edit'
    },
    search() {
      this.currentPage = 1
      const obj = {
        type: this.type,
        children: this.children,
        name: this.searchName
      }
      getRef(obj).then(response => {
        this.refData = response.data
        this.currentPageData()
      })
    },
    addRef() {
      const obj = {
        name: '',
        type: this.type,
        edit: true,
        ts: ''
      }
      this.refData.push(obj)
    },
    getRefs(data) {
      if (this.type !== data.id) {
        this.currentPage = 1
        this.type = data.id
        this.children = data.children
        const obj = {
          type: data.id,
          children: data.children,
          name: this.searchName
        }
        getRef(obj).then(response => {
          this.refData = response.data
          this.currentPageData()
        })
      }
    },
    currentPageData() {
    }
  }
}
</script>

<style scoped>
  .el-divider{
    margin-left: 70px;
    height: 77vh;
  }
  .treeScope{
    height: 750px;
  }
  .eltree{
    height: 650px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding-right: 8px;
  }
  .treeButton{
    margin-bottom: 20px;
  }
  .tree{
    width: 25%;
    float: left;
    margin-left: 2%;
  }
.table{
  width: 60%;
  float: right;
  margin-right: 5%;
}
  .titleRow {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .tableBody {
    width: 100%;
  }

  .top-container {
    margin: 18px;
    width: 87vw;
    height: 87vh;
  }
</style>
