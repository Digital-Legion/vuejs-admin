<template>
  <div class="g-input" :class="{ 'g-input--focused': isFocused }">
    <span
      class="g-input__placeholder"
      :class="{ 'g-input__placeholder--active': inputActive }"
      v-if="placeholder && !nativePlaceholder"
    >
      {{ placeholder }}
    </span>
    <textarea-autosize
      v-if="isTextarea"
      class="g-input__input g-input__input--textarea"
      :value="value"
      :rows="textareaRows"
      :max-rows="textareaRows > textareaMaxRows ? textareaRows : textareaMaxRows"
      :placeholder="nativePlaceholder ? placeholder : null"
      @input="onInput"
      @focus.native="onFocus"
      @blur.native="onBlur"
    />
    <phone-mask-input
      v-else-if="isPhone"
      :value="value"
      @input="onInput"
      :placeholder="placeholder"
      @onValidate="$emit('set-phone-valid', $event.isValidByLibPhoneNumberJs)"
      :show-flag="true"
    />
    <input
      v-else
      class="g-input__input"
      :class="{'g-input__input--password': type === 'password'}"
      :type="localType"
      :value="value"
      :min="min"
      :max="max"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="nativePlaceholder ? placeholder : null"
    >
    <div class="g-input__password-eye" @click="$emit('toggle-password')" v-if="type === 'password'">
      <img svg-inline src="@/assets/icons/eye.svg" alt="Eye" />
    </div>
    <div
      class="g-input__character-count"
      :class="[
        showCharacterCountOnFocus
          ? (inputActive ? 'g-input__character-count--active' : 'g-input__character-count--hidden')
          : '',
        { 'g-input__character-count--on-left': characterCountOnLeft }
      ]"
      v-if="showCharacterCount || showCharacterCountOnFocus"
    >
      <span class="current">{{ value ? value.toString().length : 0 }}</span>
      <template v-if="maxCharacters">
        <span>/</span>
        <span class="max">{{ maxCharacters }}</span>
      </template>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Input",

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    nativePlaceholder: {
      type: Boolean,
      default: false
    },
    isTextarea: {
      type: Boolean,
      default: false
    },
    isPhone: {
      type: Boolean,
      default: false
    },
    textareaMaxRows: {
      type: Number,
      default: 5
    },
    textareaRows: {
      type: Number,
      default: 1
    },
    maxCharacters: {
      type: Number,
      default: null
    },
    showCharacterCount: {
      type: Boolean,
      default: false
    },
    showCharacterCountOnFocus: {
      type: Boolean,
      default: false
    },
    characterCountOnLeft: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      isFocused: false
    }
  },

  watch: {
    inputActive () {
      this.$emit('set-activity', this.inputActive)
    }
  },

  computed: {
    inputActive () {
      return this.isFocused || !!this.value
    },

    localType () {
      return this.type === 'password' && this.showPassword ? 'text' : this.type
    }
  },

  methods: {
    onFocus () {
      this.isFocused = true
    },

    onBlur () {
      this.isFocused = false
    },

    onInput (e) {
      if (this.isTextarea) {
        this.$emit('input', this.maxCharacters ? e.slice(0, this.maxCharacters) : e)
      } else {
        this.$emit('input', this.maxCharacters ? e.target.value.slice(0, this.maxCharacters) : e.target.value)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/input';
</style>
