<template>
  <div id="message">
    <h4>Welcome to Human Review Pending Page</h4>
    <h4>authToken: {{ authToken }}</h4>
    
    <div v-if="emptyList">list is empty</div>
    <div v-else>list is NOT empty
      {{ hrItems[0].stix_id }}
      <v-data-table 
        :headers="mainHeaders" 
        :items="stixIds"
        item-key="stix_id"
        hide-actions
        expand>
        <template slot="items" scope="props">
          <!-- <tr @click="props.expanded = !props.expanded; selected(props.item.stix_id)">  -->
          <tr>
            <td @click="props.expanded = !props.expanded; selected(props.item)" class="text-xs">{{ props.item.stix_id }}</td> 
            <td class="text-xs"><v-checkbox></v-checkbox></td>
            <td class="text-xs"><v-checkbox></v-checkbox></td>
            <td class="text-xs"><v-checkbox></v-checkbox></td>
          </tr>
        </template>
        <template slot="expand" scope="props">
          <v-card class="elevation-10">
            <v-card-text>
              <v-data-table :headers="subHeaders"
                      :items="subItems"
                      item-key="color"
                      hide-actions
                      class="elevation-10">
                <template slot="items" scope="props">
                  <td class="text-xs">{{ props.item.modified_date }}</td>
                  <td class="text-xs">{{ props.item.object_type }}</td>
                  <td class="text-xs">{{ props.item.field_name }}</td>
                  <td class="text-xs">{{ props.item.field_value }}</td>
                  <td class="text-xs">{{ props.item.status }}</td>
                  <td class="text-xs">
                    <v-radio-group v-model="props.item.action">
                      <v-radio label="Not PII"
                        @change="updateHrItemWithAction(props.item, 'Not PII')"
                        value="Not PII">
                      </v-radio>
                      <v-radio label="Edit" 
                        @change="updateHrItemWithAction(props.item, 'Edit')"
                        value="Edit">
                      </v-radio>
                      <v-radio label="Confirm Risk" 
                        @change="updateHrItemWithAction(props.item, 'Confirm Risk')"
                        value="Confirm Risk">
                      </v-radio>
                      <v-radio label="Redact" 
                        @change="updateHrItemWithAction(props.item, 'Redact')"
                        value="Redact">                       
                      </v-radio>
                    </v-radio-group>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </div>

  </div>
</template>

<script>
'use strict'
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  created() {
    console.log('created ...')
  },

  data () {
    return {
      mainHeaders: [
        { text: 'Stix ID', value: 'stix_id' },
        { text: 'Accept All', value: 'acceptAll' },
        { text: 'Disseminate', value: 'disseminate' },
        { text: 'Do Not Disseminate', value: 'doNotDisseminate' }
      ],
      subHeaders: [
        { text: 'Action Date', value: 'modified_date' },
        { text: 'Object Type', value: 'object_type' },
        { text: 'Field', value: 'field_name' },
        { text: 'Value', value: 'field_value' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action' }
      ],
      theHrItems: this.hrItems,
      subItems: [],
      groupActions: ['disseminate', 'accept-all', 'donot disseminate'],
      selectActions: [
        { 'name': 'Confirm Risk', 'value': 1 },
        { 'name': 'Not PII', 'value': 2 },
        { 'name': 'Redact Field', 'value': 3 },
        { 'name': 'Edit', 'value': 4 },
      ]
    }
  },

  state: {
  },

  computed: {
    ... mapGetters('hrItems', ['hrItems', 'stixIds']),
    ... mapGetters('users', ['authToken']),

    emptyList() {
      if (this.hrItems === null) {
        this.retrieveHrItems()
      }
      return this.hrItems === null
    }
  },

  methods: {
    ... mapActions ('hrItems', ['getHrItems', 'updateHrItem']),

    retrieveHrItems() {
      console.log('retrieveHrItems() ...')
      this.getHrItems(this.authToken)
        .then(() => {
          this.$router.push('/hr')
        })
    },

    selected(selectedItem) {
      console.log(selectedItem.stix_id + ' is selcted!')
      this.subItems = [];
      this.hrItems.filter((item) => {
        if (item.stix_id === selectedItem.stix_id) {
          this.subItems.push(item)
        }
      })
    },

    dumpHrItem(hrItem) {
      console.log('>>> stix_id: ' + hrItem.stix_id)
      console.log('>>> object_type: ' + hrItem.object_type)
      console.log('>>> field_name: ' + hrItem.field_name)
      console.log('>>> field_value: ' + hrItem.field_value)
      console.log('>>> action: ' + hrItem.action)
      console.log('>>> status: ' + hrItem.status)
    },

    updateHrItemWithAction(selectedItem, action) {
      console.log('selelected action: ' + action)
      this.dumpHrItem(selectedItem)

      selectedItem.original_value = selectedItem.field_value
      const input = {
        authToken: this.authToken,
        hrItem: selectedItem
      }

      selectedItem.action = action;
      this.updateHrItem(input).then((result) => {
        console.log('updateHrItem completed!')
      })
    }
  }
}
</script>

<style>

</style>
