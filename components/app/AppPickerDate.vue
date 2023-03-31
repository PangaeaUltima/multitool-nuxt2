<template lang="pug">
v-menu(
  v-model="showPicker"
  :close-on-content-click="false"
  transition="scale-transition"
  offset-y
  min-width="auto"
  :nudge-bottom="$helpers.constants.style.nudgeBottomMenu"
  :disabled="disabled"
)
  template(v-slot:activator="{ on, attrs }")
    v-text-field(
      :class="[{ 'pt-0 mt-0': hideDetails }, textFieldClass]"
      :value="formatDate"
      :label="label"
      :error-messages="errorMessages"
      :rules="required ? [rules.required] : []"
      v-bind="attrs"
      v-on="on"
      :hide-details="hideDetails || 'auto'"
      :disabled="disabled"
      readonly
      :dense="$vuetify.breakpoint.mobile"
      outlined
      @click:clear="clearValue"
      :clearable="clearable"
      :background-color="backgroundColor"
      :hint="hint"
      :persistent-hint="Boolean(hint)"
    )
      template(#label="")
        slot(name="label")
  v-date-picker(
    @input="emitInput"
    :value="value"
    no-title
    :range="range"
    :min="min"
    :max="max"
    first-day-of-week="1"
    color="primary"
    :menu-props="{ contentClass: 'select-content' }"
  )
    v-spacer
    v-btn(text color="primary" @click="showPicker = false") Cancel
</template>

<script>
import { required } from '@/helpers/validators'
export default {
  name: 'AppPickerDate',
  props: {
    errorMessages: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Array],
      default: null,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: null,
    },
    min: {
      type: String,
      default: null,
    },
    max: {
      type: String,
      default: null,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    textFieldClass: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPicker: false,
      rules: { required },
    }
  },
  computed: {
    formatDate() {
      if (Array.isArray(this.value)) {
        return this.value.map((item) => item.split('-').reverse().join('.')).join(' ~ ')
      } else {
        return this.value ? this.value.split('-').reverse().join('.') : this.value
      }
    },
  },
  methods: {
    emitInput(evt) {
      if (this.range) {
        if (evt.length === 2 && Date.parse(evt[0]) > Date.parse(evt[1])) {
          this.$emit('input', evt.reverse())
        } else {
          this.$emit('input', evt)
        }
      } else {
        this.$emit('input', evt)
      }
    },
    clearValue() {
      this.$emit('input', this.range ? [] : null)
    },
  },
}
</script>